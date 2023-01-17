import config from "@/config";
import axios from "axios";

const createBoard = async (boardData) => {
    await axios.post(`${config.BASE_URL}/api/boards/createboard`, boardData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // return response.data;
};

const fetchMyBoards = async () => {
    const boards = await axios.get(
        `${config.BASE_URL}/api/boards/getmyboards`,
        {
            headers: {
                "Content-Type": "Application/json",
            },
        }
    );
    return boards.data;
};

const fetchTeamsBoards = async () => {
    const response = await axios.get(
        `${config.BASE_URL}/api/boards/getteamsboards`
    );
    return response.data;
};

const likeBoard = async (boardId) => {
    await axios.patch(`${config.BASE_URL}/api/boards/likeboard/${boardId}`);
    // return response.data;
};

const fetchBoardById = async (boardId) => {
    const response = await axios.get(
        `${config.BASE_URL}/api/boards/${boardId}`,
        {
            headers: {
                "Content-Type": "Application/json",
            },
        }
    );
    return response.data;
};

const createCard = async (cardData) => {
    await axios.post(`${config.BASE_URL}/api/boards/createcard`, cardData, {
        headers: {
            "Content-Type": "Application/json",
        },
    });
    // return response.data;
};

const updateCard = async (cardData) => {
    const response = await axios.patch(
        `${config.BASE_URL}/api/boards/updatecard`,
        cardData,
        {
            headers: {
                "Content-Type": "Application/json",
            },
        }
    );
    return response.data;
};

const deleteBoard = async (boardId) => {
    await axios.delete(`${config.BASE_URL}/api/boards/deleteboard/${boardId}`);
    // return response.data;
};

const deleteCard = async (cardId) => {
    await axios.delete(`${config.BASE_URL}/api/boards/deletecard/${cardId}`);
    // return response.data;
};

const addMember = async (data) => {
    const response = await axios.post(
        `${config.BASE_URL}/api/boards/addmember`,
        data,
        {
            headers: {
                "Content-Type": "Application/json",
            },
        }
    );
    return response.data;
};

const removeMember = async (data) => {
    const response = await axios.patch(
        `${config.BASE_URL}/api/boards/removemember`,
        data
    );
    return response.data;
};

export default {
    createBoard,
    likeBoard,
    fetchMyBoards,
    fetchTeamsBoards,
    fetchBoardById,
    createCard,
    updateCard,
    deleteBoard,
    deleteCard,
    addMember,
    removeMember,
};
