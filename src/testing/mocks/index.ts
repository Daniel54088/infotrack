export const enableMocking = async () => {
  const { worker } = await import("./browser");
  return worker.start();
};
