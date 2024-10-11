import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import { MemePicture } from "./meme-picture";
import { format } from "timeago.js";
import { MemeAuthor } from "./meme-author";
import { MemeCardComments } from "./meme-card-comments";
import { Meme } from "../services/api";
import { TimeAgo } from "./time-ago";

type MemeCardrops = {
  meme: Meme;
  commentsOpened: boolean;
  onOpenComments: (memeId: string) => void;
};
//TODO: fix timezone from backend
export const MemeCard: React.FC<MemeCardrops> = ({
  meme,
  commentsOpened,
  onOpenComments,
}) => {
  return (
    <VStack id={`meme-${meme.id}`} p={4} width="full" align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <MemeAuthor
          authorId={meme.authorId}
          nameTestId={`meme-author-${meme.id}`}
        />
        <Text fontStyle="italic" color="gray.500" fontSize="small">
          <TimeAgo date={meme.createdAt} />
        </Text>
      </Flex>
      <MemePicture
        pictureUrl={meme.pictureUrl}
        texts={meme.texts}
        dataTestId={`meme-picture-${meme.id}`}
      />
      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:{" "}
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text
            color="gray.500"
            whiteSpace="pre-line"
            data-testid={`meme-description-${meme.id}`}
          >
            {meme.description}
          </Text>
        </Box>
      </Box>

      <MemeCardComments
        memeId={meme.id}
        commentCount={meme.commentsCount}
        opened={commentsOpened}
        onOpen={onOpenComments}
      />
    </VStack>
  );
};
