class NavigationService {
  navigator: any;

  navigate(name: any, params?: any) {
    this.navigator.navigate(name, params);
  }
}

export const navigationService = new NavigationService();
