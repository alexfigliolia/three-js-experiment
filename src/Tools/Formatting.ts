export class Formatting {
  private static currencyFormatter = new Intl.NumberFormat("en-us", {
    currency: "USD",
    currencySign: "standard",
    currencyDisplay: "symbol",
  });

  public static formatCurrency(value: number) {
    return `$${this.currencyFormatter.format(value)}`;
  }
}
