import { memes, comments } from "../../../tests/mocks/handlers";
import { renderQueryHook } from "../utils";
import { act, waitFor } from "@testing-library/react";
import { useSubmitComment } from "../../hooks/use-submit-comment";

describe("useSubmitComment", () => {
  it("should call post comment", async () => {
    const meme = memes[0];

    const { result } = renderQueryHook(() => useSubmitComment(meme.id));

    await act(async () => {
      await result.current.mutateAsync({
        content: "hello world",
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(comments[0]);
  });
});
