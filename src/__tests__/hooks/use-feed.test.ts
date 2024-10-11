import { memes } from "../../../tests/mocks/handlers";
import { renderQueryHook } from "../utils";
import { waitFor } from "@testing-library/react";
import { useFeed } from "../../hooks/use-feed";

describe("useFeed", () => {
  it("should call useInfiniteQuery with the correct parameters and result", async () => {
    const { result } = renderQueryHook(() => useFeed());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      pages: [
        {
          total: memes.length,
          pageSize: memes.length,
          results: memes,
        },
      ],
      pageParams: [1],
    });
  });
});
