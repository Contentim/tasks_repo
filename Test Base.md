```base
filters:
  or:
    - file.hasTag("websoft")
formulas:
  formatted_price: if(price, price.toFixed(2) + " dollars")
  ppu: (price / age).toFixed(2)
properties:
  status:
    displayName: Status
  formula.formatted_price:
    displayName: Price
  file.ext:
    displayName: Extension
views:
  - type: table
    name: My table
    sort:
      - property: age
        direction: DESC
    limit: 10

```