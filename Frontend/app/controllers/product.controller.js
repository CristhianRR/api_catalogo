(function () {
  'use strict';

  angular
    .module('catalogoApp')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['ProductService'];

  function ProductController(ProductService) {
    var vm = this;

    /* ─── Estado ─────────────────────────────── */
    vm.products       = [];
    vm.loading        = false;
    vm.isEditing      = false;
    vm.editingId      = null;
    vm.formData       = {};
    vm.activeTab      = 'inicio';
    vm.pageSize       = '10';
    vm.searchText     = '';
    vm.marcaFilter    = '';
    vm.catFilter      = '';
    vm.marcaSearch    = '';
    vm.catSearch      = '';
    vm.inventoryEditingId = null;
    vm.inventoryEditData  = null;

    /* ─── Catálogos ──────────────────────────── */
    vm.categorias = [
      'Cremas', 'Lociones', 'Perfumes', 'Fragancias', 'Maquillaje',
      'Cuidado Capilar', 'Cuidado Corporal', 'Alimentos', 'Bebidas',
      'Suplementos', 'Accesorios', 'Ropa', 'Hogar', 'Otro'
    ];

    vm.marcas = [
      "L'Bel", 'Esika', 'Cyzone', 'Avon', 'Yanbal',
      'Natura', 'Unique', 'Mary Kay', 'Herbalife', 'Omnilife',
      'Novaventa', 'Otra'
    ];

    /* ─── Métodos públicos ───────────────────── */
    vm.setTab            = setTab;
    vm.saveProduct       = saveProduct;
    vm.editProduct       = editProduct;
    vm.deleteProduct     = deleteProduct;
    vm.cancelEdit        = cancelEdit;
    vm.removeImage       = removeImage;
    vm.getRecentProducts = getRecentProducts;
    vm.getFiltered       = getFiltered;
    vm.clearFilters      = clearFilters;
    vm.saveInventoryEdit = saveInventoryEdit;
    vm.cancelInventoryEdit = cancelInventoryEdit;

    init();

    /* ─── Inicialización ─────────────────────── */
    function init() {
      resetForm();
      loadProducts();
    }

    function setTab(tab) {
      vm.activeTab = tab;
    }

    /* ─── Carga de datos ─────────────────────── */
    function loadProducts() {
      vm.loading = true;
      ProductService.getAll()
        .then(function (res) {
          vm.products = res.data || [];
        })
        .catch(function () {
          toast('No fue posible cargar los productos.', 'red darken-1');
        })
        .finally(function () {
          vm.loading = false;
        });
    }

    /* ─── Filtros de vista ───────────────────── */
    function getRecentProducts() {
      var limit = parseInt(vm.pageSize, 10);
      return limit ? vm.products.slice(0, limit) : vm.products;
    }

    function getFiltered() {
      var q  = (vm.searchText   || '').toLowerCase();
      var m  = vm.marcaFilter   || '';
      var c  = vm.catFilter     || '';
      return vm.products.filter(function (p) {
        return (!q || p.nombre.toLowerCase().indexOf(q) !== -1)
            && (!m || p.marca     === m)
            && (!c || p.categoria === c);
      });
    }

    function clearFilters() {
      vm.searchText  = '';
      vm.marcaFilter = '';
      vm.catFilter   = '';
    }

    /* ─── CRUD ───────────────────────────────── */
    function saveProduct() {
      if (!isValid()) {
        toast('Completa todos los campos obligatorios.', 'orange darken-2');
        return;
      }

      var payload = {
        nombre:           vm.formData.nombre,
        marca:            vm.formData.marca,
        descripcion:      vm.formData.descripcion,
        precio:           Number(vm.formData.precio),
        stock:            Number(vm.formData.stock),
        categoria:        vm.formData.categoria,
        fechaVencimiento: vm.formData.fechaVencimiento || null,
        imagen:           vm.formData.imagen           || ''
      };

      vm.loading = true;
      var req = vm.isEditing
        ? ProductService.update(vm.editingId, payload)
        : ProductService.create(payload);

      req
        .then(function () {
          toast(vm.isEditing ? 'Producto actualizado.' : 'Producto creado.', 'green darken-1');
          resetForm();
          loadProducts();
        })
        .catch(function (err) {
          var msg = err.data && err.data.message ? err.data.message : 'Error al guardar.';
          toast(msg, 'red darken-1');
          vm.loading = false;
        });
    }

    function editProduct(product) {
      if (vm.activeTab === 'inventario') {
        vm.inventoryEditingId = product._id;
        vm.inventoryEditData = {
          nombre: product.nombre,
          marca: product.marca,
          categoria: product.categoria,
          descripcion: product.descripcion,
          precio: product.precio,
          stock: product.stock,
          fechaVencimiento: product.fechaVencimiento
            ? product.fechaVencimiento.substring(0, 10)
            : '',
          imagen: product.imagen || ''
        };
        return;
      }

      vm.isEditing = true;
      vm.editingId = product._id;
      vm.formData  = {
        nombre:           product.nombre,
        marca:            product.marca,
        descripcion:      product.descripcion,
        precio:           product.precio,
        stock:            product.stock,
        categoria:        product.categoria,
        fechaVencimiento: product.fechaVencimiento
                          ? product.fechaVencimiento.substring(0, 10)
                          : '',
        imagen:           product.imagen
      };
      vm.activeTab = 'inicio';
    }

    function saveInventoryEdit() {
      if (!vm.inventoryEditingId || !vm.inventoryEditData) return;

      if (!vm.inventoryEditData.nombre || !vm.inventoryEditData.marca || !vm.inventoryEditData.categoria) {
        toast('Completa nombre, marca y categoria para actualizar.', 'orange darken-2');
        return;
      }

      var payload = {
        nombre: vm.inventoryEditData.nombre,
        marca: vm.inventoryEditData.marca,
        categoria: vm.inventoryEditData.categoria,
        descripcion: vm.inventoryEditData.descripcion || '',
        precio: Number(vm.inventoryEditData.precio),
        stock: Number(vm.inventoryEditData.stock),
        fechaVencimiento: vm.inventoryEditData.fechaVencimiento || null,
        imagen: vm.inventoryEditData.imagen || ''
      };

      vm.loading = true;
      ProductService.update(vm.inventoryEditingId, payload)
        .then(function () {
          toast('Producto actualizado.', 'green darken-1');
          vm.inventoryEditingId = null;
          vm.inventoryEditData = null;
          loadProducts();
        })
        .catch(function (err) {
          var msg = err.data && err.data.message ? err.data.message : 'Error al actualizar.';
          toast(msg, 'red darken-1');
          vm.loading = false;
        });
    }

    function cancelInventoryEdit() {
      vm.inventoryEditingId = null;
      vm.inventoryEditData = null;
    }

    function deleteProduct(id) {
      if (!window.confirm('\u00BFEliminar este producto?')) return;
      vm.loading = true;
      ProductService.remove(id)
        .then(function () {
          toast('Producto eliminado.', 'green darken-1');
          if (vm.editingId === id) resetForm();
          if (vm.inventoryEditingId === id) cancelInventoryEdit();
          loadProducts();
        })
        .catch(function () {
          toast('Error al eliminar.', 'red darken-1');
          vm.loading = false;
        });
    }

    function cancelEdit() { resetForm(); }

    function removeImage() {
      vm.formData.imagen = '';
      var el = document.getElementById('imagenFile');
      if (el) el.value = '';
    }

    /* ─── Helpers ────────────────────────────── */
    function resetForm() {
      vm.isEditing = false;
      vm.editingId = null;
      vm.formData  = {
          nombre: '', marca: null, descripcion: '',
          precio: null, stock: null, categoria: null,
        fechaVencimiento: '', imagen: ''
      };
        vm.marcaSearch = '';
        vm.catSearch   = '';
      var el = document.getElementById('imagenFile');
      if (el) el.value = '';
    }

    function isValid() {
      return !!(
        vm.formData.nombre    &&
        vm.formData.marca     &&
        vm.formData.descripcion &&
        vm.formData.categoria &&
        vm.formData.precio !== null && vm.formData.precio !== '' &&
        vm.formData.stock  !== null && vm.formData.stock  !== ''
      );
    }

    function toast(msg, classes) {
      if (window.M && window.M.toast) {
        window.M.toast({ html: msg, classes: classes || 'blue darken-1', displayLength: 3000 });
      }
    }
  }
})();
