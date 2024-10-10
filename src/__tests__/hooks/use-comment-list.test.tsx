import { useCommentList } from "../../hooks/use-comment-list";
import { comments } from "../../../tests/mocks/handlers";
import { renderQueryHook } from "../utils";
import { waitFor } from "@testing-library/react";

describe("useCommentList", () => {
  it("should call useInfiniteQuery with the correct parameters", async () => {
    const memeId = "dummy_meme_id_1";
    const { result } = renderQueryHook(() => useCommentList(memeId));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const expectedResult = comments.filter(
      (comment) => comment.memeId == memeId
    );

    expect(result.current.data).toEqual({
      pages: [
        {
          total: expectedResult.length,
          pageSize: expectedResult.length,
          results: expectedResult,
        },
      ],
      pageParams: [1],
    });
  });
});
