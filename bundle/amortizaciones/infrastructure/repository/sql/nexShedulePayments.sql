select
  app."installmentNumber",
  app."paymentDate",
  app."productId",
  app."obligationNumber",
  app."description",
  app."nameBank",
  app."creditLine",
  app."Quote"
from "AmortizationsPaymentsPending" app
where app."paymentDate" between :startDate and :finishDate
group by
  app."installmentNumber",
  app."paymentDate",
  app."productId",
  app."obligationNumber",
  app."description",
  app."nameBank",
  app."creditLine",
  app."Quote"