export async function getData() {
    return {
      "message": `Hello from ${process.env.NODE_ENV}`
    };
}
