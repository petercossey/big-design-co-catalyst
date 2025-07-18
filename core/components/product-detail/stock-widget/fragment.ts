import { graphql } from '~/client/graphql';

export const StockWidgetFragment = graphql(`
  fragment StockWidgetFragment on Product {
    entityId
    id
    sku
    name
    customFields(names: ["_lead_time|Fast Delivery", "_lead_time|Special Order"]) {
      edges {
        node {
          name
          value
        }
      }
    }
    variants {
      edges {
        node {
          entityId
          id
          sku
          inventory {
            byLocation {
              edges {
                node {
                  availableToSell
                  isInStock
                  locationEntityCode
                }
              }
            }
          }
        }
      }
    }
  }
`);