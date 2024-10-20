export const isEmpty = (
  val: unknown
): val is null | undefined | "" | object => {
  return (
    val === undefined ||
    val === null ||
    (typeof val === "object" &&
      val !== null &&
      Object.keys(val).length === 0) ||
    (typeof val === "string" && val.trim().length === 0)
  );
};
