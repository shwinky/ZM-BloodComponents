import vest, { test, enforce } from "vest";

export default vest.create((data = {}) => {
  test("username", "Username is required", () => {
    enforce(data.username).isNotEmpty();
  });
});