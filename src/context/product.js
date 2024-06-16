class ProductContext {
  selectedBrothId = null;
  selectedProteinId = null;

  brothChanged = new CustomEvent('broth-changed');
  proteinChanged = new CustomEvent('protein-changed');

  setSelectedBrothId(id) {
    this.selectedBrothId = id;
    document.dispatchEvent(this.brothChanged);
  }

  setSelectedProteinId(id) {
    this.selectedProteinId = id;
    document.dispatchEvent(this.proteinChanged);
  }

}

const productContext = new ProductContext();

export default productContext;