import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.08);
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    overflow: auto;
    align-content: flex-start;
    gap: 16px;

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