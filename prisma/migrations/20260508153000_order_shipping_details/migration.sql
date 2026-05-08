ALTER TABLE "Order"
ADD COLUMN     "shippingAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingCarrierName" TEXT,
ADD COLUMN     "shippingDeliveryWindowLabel" TEXT,
ADD COLUMN     "shippingPostalCode" TEXT,
ADD COLUMN     "shippingRegion" TEXT,
ADD COLUMN     "shippingServiceCode" TEXT,
ADD COLUMN     "shippingServiceName" TEXT,
ADD COLUMN     "shippingSource" TEXT;
