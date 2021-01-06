import Vue from "vue";
import Vuex from "vuex";

import {v4 as uuidv4} from 'uuid';

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {
        initialized: false,
        keyPool: {},
        boxWidth: 0,
        boxHeight: 0,
        positions: {
            flandre: {
                top: 710,
                left: 1
            },
            messes: {}
        }
    },
    mutations: {
        activeGame: (state) => {
            state.initialized = true;
        },
        pressKey: (state, key) => {
            state.keyPool[key] = true;
        },
        releaseKey: (state, key) => {
            delete state.keyPool[key];
        },
        setBoxSize: (state, {width, height}) => {
            state.boxWidth = width;
            state.boxHeight = height;
        },
        setFlandrePosition: (state, {top, left}) => {
            state.positions.flandre.top = top;
            state.positions.flandre.left = left;
        },
        setFlandreTopWithPrefix: (state, {direction, prefix}) => {
            const top = state.positions.flandre.top;
            state.positions.flandre.top = direction ? top - prefix : top + prefix;
        },
        setFlandreLeftWithPrefix: (state, {direction, prefix}) => {
            const left = state.positions.flandre.left;
            state.positions.flandre.left = direction ? left + prefix : left - prefix;
        },
        generateMess: (state, uuid) => {
            state.positions.messes[uuid] = {
                top: state.positions.flandre.top,
                left: state.positions.flandre.left + 50
            }
        },
        updateMess: (state, {uuid, dot}) => {
            state.positions.messes[uuid].top = dot;
        },
        revokeMess: (state, uuid) => {
            delete state.positions.messes[uuid];
        }
    },
    actions: {
        setFlandreTopWithPrefix: ({commit, state}, {direction, prefix}) => {
            commit("setFlandreTopWithPrefix", {direction, prefix});
            if (state.positions.flandre.top > state.boxHeight) {
                const left = state.positions.flandre.left;
                commit("setFlandrePosition", {top: state.boxHeight, left: left});
            }
            if (state.positions.flandre.top < 0) {
                const left = state.positions.flandre.left;
                commit("setFlandrePosition", {top: 0, left: left});
            }
        },
        setFlandreLeftWithPrefix: ({commit, state}, {direction, prefix}) => {
            commit("setFlandreLeftWithPrefix", {direction, prefix});
            if (state.positions.flandre.left > state.boxWidth) {
                const top = state.positions.flandre.top;
                commit("setFlandrePosition", {top: top, left: state.boxWidth});
            }
            if (state.positions.flandre.left < 0) {
                const top = state.positions.flandre.top;
                commit("setFlandrePosition", {top: top, left: 0});
            }
        },
        newMess({commit, state}) {
            const uuid = uuidv4();
            commit("generateMess", uuid);
            let dot = state.positions.flandre.top;
            const handler = function () {
                dot -= 35;
                commit("updateMess", {uuid, dot});
                if (dot > 0) {
                    window.requestAnimationFrame(handler);
                } else {
                    commit("revokeMess", uuid);
                }
            }
            handler();
        },
    }
});

export default Store;
