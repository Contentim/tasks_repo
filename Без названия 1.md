```base
filters:
  or:
    - file.hasTag("tag")
    - and:
        - file.hasTag("book")
        - file.hasLink("Textbook")
    - not:
        - file.hasTag("book")
        - file.inFolder("Required Reading")
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
    filters:
      and:
        - status != "done"
        - or:
            - formula.ppu > 5
            - price > 2.1
    order:
      - file.name
      - file.ext
      - age
      - formula.ppu
      - formula.formatted_price
    sort:
      - property: age
        direction: DESC
    limit: 10

```