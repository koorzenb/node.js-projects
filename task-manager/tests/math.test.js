const {tip} = require("../src/math");

test("testing tip", () => {
    const total = tip(10)
    expect(total).toBe(1);
})

test("async demo", (done) => {
    setTimeout(() => {
        const total = tip(100)
        expect(total).toBe(10);
        done();
    }, 2000);
})