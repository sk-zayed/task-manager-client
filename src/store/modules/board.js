const board = {
    state: {
        loading: false,
        toDoArr: [],
        doingArr: [],
        doneArr: [],
        cardObject: {},
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        toDoArr(state) {
            return state.toDoArr;
        },
        doingArr(state) {
            return state.doingArr;
        },
        doneArr(state) {
            return state.doneArr;
        },
        cardObject(state) {
            return state.cardObject;
        },
    },
    mutations: {
        setLoading(state) {
            state.loading = !state.loading;
        },
        setToDoArr(state, arr) {
            state.toDoArr = arr;
        },
        setDoingArr(state, arr) {
            state.doingArr = arr;
        },
        setDoneArr(state, arr) {
            state.doneArr = arr;
        },
        setCardObject(state, obj) {
            state.cardObject = obj;
        },
    },
};

export default board;
