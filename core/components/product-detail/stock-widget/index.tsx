import { clsx } from 'clsx';

import { FragmentOf, readFragment } from '~/client/graphql';

import { StockWidgetFragment } from './fragment';

interface StockWidgetProps {
  product: FragmentOf<typeof StockWidgetFragment>;
}

interface CustomField {
  node: {
    name: string;
    value: string;
  };
}

interface CustomFields {
  edges: CustomField[];
}

function getStockStatus(stock: number) {
  if (stock >= 20) return { status: 'In Stock', colorClass: 'text-green-600' };
  if (stock >= 5) return { status: 'Low Stock', colorClass: 'text-orange-600' };

  return { status: 'Very Low Stock', colorClass: 'text-red-600' };
}

function getDeliveryInfo(customFields: CustomFields | undefined, hasStock: boolean) {
  const fields = customFields?.edges || [];

  const fastDelivery = fields.find((field) => field.node.name === '_lead_time|Fast Delivery')?.node
    .value;

  const specialOrder = fields.find((field) => field.node.name === '_lead_time|Special Order')?.node
    .value;

  if (hasStock && fastDelivery) {
    return `Fast Delivery: ${fastDelivery}`;
  } else if (!hasStock && specialOrder) {
    return `Special Order: ${specialOrder}`;
  }

  return hasStock
    ? 'Fast Delivery: Ships in 1–3 business days'
    : 'Special Order: Ships in 3–4 weeks';
}

function formatLocation(code: string) {
  const [city, type] = code.split('-');

  return type === 'WAREHOUSE' ? `${city} Warehouse` : `${city} Store`;
}

export function StockWidget({ product }: StockWidgetProps) {
  const productData = readFragment(StockWidgetFragment, product);

  // Handle case where product has no variants or inventory
  if (!productData?.variants.edges?.length) {
    const customFields = productData?.customFields;
    const deliveryInfoText = getDeliveryInfo(
      customFields,
      false,
    );

    return (
      <div className="mb-5">
        <div className="mb-4 flex items-center gap-3 rounded-lg border-2 border-red-300 bg-red-50 p-4 text-red-600">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="flex flex-1 items-center justify-between">
            <span className="font-semibold">Out of Stock</span>
            <span className="font-bold">0 units</span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 text-base font-semibold text-gray-900">Delivery</h3>
          <div className="text-sm text-gray-600">{deliveryInfoText}</div>
        </div>
      </div>
    );
  }

  const firstVariant = productData.variants.edges[0];

  if (!firstVariant.node.inventory?.byLocation?.edges) {
    return (
      <div className="mb-5">
        <div className="mb-4 flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-gray-50 p-4 text-gray-600">
          <div className="h-3 w-3 rounded-full bg-gray-500" />
          <div className="flex flex-1 items-center justify-between">
            <span className="font-semibold">Stock information unavailable</span>
          </div>
        </div>
      </div>
    );
  }

  const inventory = firstVariant.node.inventory.byLocation.edges;
  const totalStock = inventory.reduce((sum, loc) => sum + loc.node.availableToSell, 0);
  const mainStatus = getStockStatus(totalStock);
  const hasStock = totalStock > 0;
  const customFields = productData.customFields;
  const deliveryInfo = getDeliveryInfo(
    customFields,
    hasStock,
  );

  const statusColorClasses = {
    'text-green-600': 'border-green-300 bg-green-50',
    'text-orange-600': 'border-orange-300 bg-orange-50',
    'text-red-600': 'border-red-300 bg-red-50',
  };

  const dotColorClasses = {
    'text-green-600': 'bg-green-500',
    'text-orange-600': 'bg-orange-500',
    'text-red-600': 'bg-red-500',
  };

  return (
    <div className="mb-5">
      {/* Main Stock Status */}
      <div
        className={clsx(
          'mb-4 flex items-center gap-3 rounded-lg border-2 p-4',
          mainStatus.colorClass === 'text-green-600' && statusColorClasses['text-green-600'],
          mainStatus.colorClass === 'text-orange-600' && statusColorClasses['text-orange-600'],
          mainStatus.colorClass === 'text-red-600' && statusColorClasses['text-red-600'],
          mainStatus.colorClass,
        )}
      >
        <div
          className={clsx(
            'h-3 w-3 rounded-full',
            mainStatus.colorClass === 'text-green-600' && dotColorClasses['text-green-600'],
            mainStatus.colorClass === 'text-orange-600' && dotColorClasses['text-orange-600'],
            mainStatus.colorClass === 'text-red-600' && dotColorClasses['text-red-600'],
          )}
        />
        <div className="flex flex-1 items-center justify-between">
          <span className="font-semibold">{mainStatus.status}</span>
          <span className="font-bold">{totalStock} units</span>
        </div>
      </div>

      {/* Stock by Location */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 text-base font-semibold text-gray-900">Stock by Location</h3>
        {inventory.map((location, idx) => {
          const stock = location.node.availableToSell;
          const status = getStockStatus(stock);

          return (
            <div
              className="flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    'h-2 w-2 rounded-full',
                    status.colorClass === 'text-green-600' && 'bg-green-500',
                    status.colorClass === 'text-orange-600' && 'bg-orange-500',
                    status.colorClass === 'text-red-600' && 'bg-red-500',
                  )}
                />
                <span className="text-sm text-gray-600">
                  {formatLocation(location.node.locationEntityCode)}
                </span>
              </div>
              <span className={clsx('text-sm font-medium', status.colorClass)}>{stock} units</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>20+ units</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-orange-500" />
          <span>5-19 units</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span>0-4 units</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Delivery</h3>
        <div className="text-sm text-gray-600">{deliveryInfo}</div>
      </div>
    </div>
  );
}