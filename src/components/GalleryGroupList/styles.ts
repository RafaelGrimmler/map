import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 100%;
    height: 100%;
    gap: 72px;
    display: flex;
    overflow: auto;
    flex-direction: column;

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

export const StyledGroupContainer = styled(Box)`
    width: 100%;
    height: min-content;
    gap: 12px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
`

export const StyledImagesContainer = styled(Box)`
    column-count: 5;
    width: 100%;
    gap: 16px;
    height: min-content;
`
