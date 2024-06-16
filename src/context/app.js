class AppContext {
  loading = false

  setLoading = (value) => {
    this.loading = value;
    const event = new Event('loading-changed');
    document.dispatchEvent(event);
  };
}

const appContext = new AppContext();

export default appContext;