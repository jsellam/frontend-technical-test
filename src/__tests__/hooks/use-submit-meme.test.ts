import { memes } from "../../../tests/mocks/handlers";
import { renderQueryHook } from "../utils";
import { act, waitFor } from "@testing-library/react";
import { useSubmitMeme } from "../../hooks/use-submit-meme";

describe("useSubmitMeme", () => {
  it("should call post meme", async () => {
    const meme = memes[0];

    const mockFile = new File(["file content"], "mockFile.txt", {
      type: "text/plain",
    });

    const { result } = renderQueryHook(() => useSubmitMeme());

    await act(async () => {
      await result.current.mutateAsync({
        ...meme,
        picture: mockFile,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(meme);
  });
});
