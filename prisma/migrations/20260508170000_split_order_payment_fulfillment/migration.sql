ALTER TYPE "OrderStatus" RENAME TO "PaymentStatus";

ALTER TABLE "Order"
  RENAME COLUMN "status" TO "paymentStatus";

ALTER TABLE "Order"
  ALTER COLUMN "paymentStatus" SET DEFAULT 'pending';

CREATE TYPE "FulfillmentStatus" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'returned', 'canceled');

ALTER TABLE "Order"
  ADD COLUMN "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'pending',
  ADD COLUMN "processingAt" TIMESTAMP(3),
  ADD COLUMN "shippedAt" TIMESTAMP(3),
  ADD COLUMN "deliveredAt" TIMESTAMP(3),
  ADD COLUMN "shippingNotificationSentAt" TIMESTAMP(3);

UPDATE "Order"
SET
  "fulfillmentStatus" = CASE
    WHEN "paymentStatus" = 'paid' THEN 'processing'::"FulfillmentStatus"
    WHEN "paymentStatus" = 'canceled' THEN 'canceled'::"FulfillmentStatus"
    ELSE 'pending'::"FulfillmentStatus"
  END,
  "processingAt" = CASE
    WHEN "paymentStatus" = 'paid' THEN COALESCE("completedAt", "updatedAt")
    ELSE NULL
  END;