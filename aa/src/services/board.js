import config from "@/config";
import axios from "axios";

const createBoard = async (boardData) => {
    try {
        await axios.post(
            `${config.BASE_URL}/api/boards/createboard`,
            boardData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // return response.data;
    } catch (error) {
        return error;
    }
};

const fetchMyBoards = async () => {
    try {
        const boards = await axios.get(
            `${config.BASE_URL}/api/boards/getmyboards`,
            {
                headers: {
                    "Content-Type": "Application/json",
                },
            }
        );
        return boards.data;
    } catch (error) {
        return error;
    }
};

const fetchTeamsBoards = async () => {
    try{
        const response = await axios.get(`${config.BASE_URL}/api/boards/getteamsboards`);
        return response.data;
    } catch(error) {
        return error;
    }
};

const likeBoard = async (boardId) => {
    try {
        await axios.patch(`${config.BASE_URL}/api/boards/likeboard/${boardId}`);
        // return response.data;
    } catch (error) {
        return error;
    }
};

const fetchBoardById = async (boardId) => {
    try {
        const response = await axios.get(
            `${config.BASE_URL}/api/boards/${boardId}`,
            {
                headers: {
                    "Content-Type": "Application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

const createCard = async (cardData) => {
    try {
        await axios.post(`${config.BASE_URL}/api/boards/createcard`, cardData, {
            headers: {
                "Content-Type": "Application/json",
            },
        });
        // return response.data;
    } catch (error) {
        return error;
    }
};

const updateCard = async (cardData) => {
    try {
        const response = await axios.put(
            `${config.BASE_URL}/api/boards/updatecard`,
            cardData,
            {
                headers: {
                    "Content-Type": "Application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

const deleteBoard = async (boardId) => {
    try {
        await axios.delete(
            `${config.BASE_URL}/api/boards/deleteboard/${boardId}`
        );
        // return response.data;
    } catch (error) {
        return error;
    }
};

const deleteCard = async (cardId) => {
    try {
        await axios.delete(
            `${config.BASE_URL}/api/boards/deletecard/${cardId}`
        );
        // return response.data;
    } catch (error) {
        return error;
    }
};

const addMember = async (data) => {
    try {
        const response = await axios.post(`${config.BASE_URL}/api/boards/addmember`, data, {
            headers: {
                "Content-Type": "Application/json"
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

const removeMember = async (data) => {
    try {
        const response = await axios.patch(`${config.BASE_URL}/api/boards/removemember`, data);
        return response.data;
    } catch (error) {
        return error;
    }
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
    removeMember
};
