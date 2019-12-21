import { handleSubmit } from "./formHandler"

test ('It should return true', async () => {
    expect(handleSubmit).toBeDefined();
});

test ('It should be a function', async () => {
    expect(typeof handleSubmit).toBe("function");
});

//test("Test async post", async () => {
 //   let res = await postTest('http:localhost:3030/test', {});
 //   expect(res.msg).toEqual('Hi');
//})