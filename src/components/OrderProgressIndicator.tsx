import React, { useEffect } from 'react';
import { ShoppingCart, Zap, Truck, PackageCheck, CheckCircle2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available

// Define the possible order statuses
const ORDER_STATUSES = ['Order Placed', 'Being Prepared', 'Out for Delivery', 'Delivered'] as const;
export type OrderStatus = typeof ORDER_STATUSES[number];

interface Step {
  id: OrderStatus;
  label: string;
  IconComponent: LucideIcon;
  activeAnimate?: boolean;
}

const steps: Step[] = [
  { id: 'Order Placed', label: 'Order Placed', IconComponent: ShoppingCart },
  { id: 'Being Prepared', label: 'Preparing', IconComponent: Zap, activeAnimate: true },
  { id: 'Out for Delivery', label: 'On Its Way', IconComponent: Truck },
  { id: 'Delivered', label: 'Delivered', IconComponent: PackageCheck },
];

interface OrderProgressIndicatorProps {
  currentStatus: OrderStatus;
}

const OrderProgressIndicator: React.FC<OrderProgressIndicatorProps> = ({ currentStatus }) => {
  useEffect(() => {
    console.log('OrderProgressIndicator loaded with status:', currentStatus);
  }, [currentStatus]);

  const currentStatusIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="w-full py-4">
      <div className="flex w-full items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStatusIndex;
          const isActive = index === currentStatusIndex;
          const isPending = index > currentStatusIndex;

          let IconToRender: LucideIcon;
          let iconClassName = "h-6 w-6 sm:h-7 sm:w-7";
          let labelClassName = "text-xs sm:text-sm";
          let circleBgClassName = "";
          let connectorClassName = "bg-gray-300";

          if (isCompleted) {
            IconToRender = CheckCircle2;
            iconClassName = cn(iconClassName, "text-green-600");
            labelClassName = cn(labelClassName, "text-green-700 font-medium");
            circleBgClassName = "bg-green-100";
            connectorClassName = "bg-green-500";
          } else if (isActive) {
            IconToRender = step.IconComponent;
            if (step.id === 'Delivered') {
              iconClassName = cn(iconClassName, "text-green-600");
              labelClassName = cn(labelClassName, "text-green-700 font-semibold");
              circleBgClassName = "bg-green-100";
              // No connector after 'Delivered' is active, but if there was one, it would be based on this step's color
            } else {
              iconClassName = cn(iconClassName, "text-blue-600");
              labelClassName = cn(labelClassName, "text-blue-700 font-semibold");
              circleBgClassName = "bg-blue-100";
            }
            if (step.activeAnimate) {
              iconClassName = cn(iconClassName, "animate-pulse");
            }
            // Connector color after an active step (that isn't the last completed one)
            // If current step is active and not 'Delivered', next connector is blue showing "in progress"
            // Or, for simplicity, treat connector color based on the status of the step *before* it.
            // If step 'i' is active, connector 'i' (after it) would be "active path".
            // The existing logic sets connector based on *its* preceding step.
            // So, if step 'i' is completed, connector 'i' is green. This is handled above.
            // If step 'i' is active, connector 'i' should be blue.
            if (step.id !== 'Delivered') { // Avoid coloring connector after 'Delivered'
                 connectorClassName = "bg-blue-500";
            } else {
                 connectorClassName = "bg-gray-300"; // No active connector after delivered
            }


          } else { // isPending
            IconToRender = step.IconComponent;
            iconClassName = cn(iconClassName, "text-gray-400");
            labelClassName = cn(labelClassName, "text-gray-500");
            circleBgClassName = "bg-gray-100";
            connectorClassName = "bg-gray-300";
          }

          // Special handling for the connector *before* the current step
          // If the current step is active, the connector leading to it should be its active color
          // This is implicitly handled: if step `i-1` is completed, connector `i-1` is green.
          // If step `i-1` is active, connector `i-1` is blue.

          return (
            <React.Fragment key={step.id}>
              {/* Node Part: Icon + Label */}
              <div className="flex flex-col items-center text-center px-1 min-w-[60px] sm:min-w-[80px]">
                <div className={cn("p-2 rounded-full transform transition-all duration-300", circleBgClassName, isActive ? "scale-110" : "scale-100")}>
                  <IconToRender className={iconClassName} />
                </div>
                <p className={cn("mt-1.5 sm:mt-2", labelClassName)}>{step.label}</p>
              </div>

              {/* Connector Part (if not the last step) */}
              {index < steps.length - 1 && (
                <div className={cn("flex-1 h-1 sm:h-1.5 rounded mx-1 sm:mx-2 transition-colors duration-300", 
                  // Connector color logic: if the step *before* this connector is completed, connector is green.
                  // If the step *before* this connector is active (and not 'Delivered'), connector is blue.
                  // Otherwise, gray.
                  (isCompleted) ? 'bg-green-500' : 
                  (isActive && step.id !== 'Delivered') ? 'bg-blue-500' : 'bg-gray-300'
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressIndicator;