class ProductContext {
  // brothList = [];
  // proteinList = [];
  selectedBrothId = null;
  selectedProteinId = null;

  brothChanged = new CustomEvent('broth-changed');
  proteinChanged = new CustomEvent('protein-changed');

  setSelectedBrothId(id) {
    this.selectedBrothId = id;
    document.dispatchEvent(this.brothChanged);
  }

  getSelectedBrothId() {
    return this.selectedBrothId;
  }

  setSelectedProteinId(id) {
    this.selectedProteinId = id;
    document.dispatchEvent(this.proteinChanged);
  }

  getSelectedProteinId() {
    return this.selectedProteinId;
  }
}

const productContext = new ProductContext();

export default productContext;