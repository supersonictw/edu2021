import Vue from "vue";
import Vuex from "vuex";

import Constant from "@/data/const";

import {v4 as uuidv4} from 'uuid';
import {sha256} from "js-sha256";

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {
        initialized: false,
        heart: Constant.HEART,
        keyPool: {},
        boxWidth: 0,
        boxHeight: 0,
        positions: {
            flandre: {
                top: 710,
                left: 1
            },
            messes: {},
            enemiesInit: {},
            chaosInit: {}
        },
        currentLevel: 0,
        scores: {}
    },
    mutations: {
        activeGame: (state) => {
            state.initialized = true;
        },
        inactiveGame: (state) => {
            state.initialized = false;
        },
        resetHeart: (state) => {
            state.heart = Constant.HEART;
        },
        lostHeart: (state) => {
            state.heart--;
        },
        setLevel: (state, level) => {
            if (level > 0 && level <= Constant.MAX_LEVEL) {
                state.currentLevel = level;
            } else {
                console.warn("Unknown level code: " + level);
            }
        },
        resetScores: (state) => {
            state.scores = [];
        },
        addScores: (state, prefix) => {
            if (!(state.currentLevel in state.scores)) {
                state.scores[state.currentLevel] = 0;
            }
            state.scores[state.currentLevel] += prefix;
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
                left: state.positions.flandre.left + Constant.AIM_PREFIX
            }
        },
        updateMess: (state, {uuid, top}) => {
            state.positions.messes[uuid].top = top;
        },
        revokeMess: (state, uuid) => {
            delete state.positions.messes[uuid];
        },
        registerEnemy: (state, {hashSign, data}) => {
            state.positions.enemiesInit[hashSign] = data;
        },
        unregisterEnemy: (state, hashSign) => {
            delete state.positions.enemiesInit[hashSign];
        },
        generateChaos: (state, {hashSign, data}) => {
            state.positions.chaosInit[hashSign] = data;
        },
        updateChaos: (state, {hashSign, top, left}) => {
            state.positions.chaosInit[hashSign].top = top;
            state.positions.chaosInit[hashSign].left = left;
        },
        revokeChaos: (state, hashSign) => {
            delete state.positions.chaosInit[hashSign];
        }
    },
    actions: {
        setFlandreTopWithPrefix: ({commit, state}, {direction, prefix}) => {
            commit("setFlandreTopWithPrefix", {direction, prefix});
            const fixValue = Constant.FLANDRE.HEIGHT / 2;
            if ((state.positions.flandre.top + fixValue) > state.boxHeight) {
                const left = state.positions.flandre.left;
                commit("setFlandrePosition", {top: (state.boxHeight - fixValue), left: left});
            }
            if (state.positions.flandre.top < 0) {
                const left = state.positions.flandre.left;
                commit("setFlandrePosition", {top: 0, left: left});
            }
        },
        setFlandreLeftWithPrefix: ({commit, state}, {direction, prefix}) => {
            commit("setFlandreLeftWithPrefix", {direction, prefix});
            const fixValue = Constant.FLANDRE.WIDTH / 2;
            if ((state.positions.flandre.left + fixValue) > state.boxWidth) {
                const top = state.positions.flandre.top;
                commit("setFlandrePosition", {top: top, left: (state.boxWidth - fixValue)});
            }
            if ((state.positions.flandre.left + fixValue) < 0) {
                const top = state.positions.flandre.top;
                commit("setFlandrePosition", {top: top, left: (0 - fixValue)});
            }
        },
        newMess({commit}) {
            const uuid = uuidv4();
            commit("generateMess", uuid);
        },
        newEnemy({commit}, {timestamp, data}) {
            const hashSign = "enemy_" + sha256(`${timestamp}_${JSON.stringify(data)}`);
            commit("registerEnemy", {hashSign, data});
        },
        newChaos({commit}, {operator, info, router}) {
            const hashSign = "chaos_" + sha256(`${operator}_${JSON.stringify(info)}_${JSON.stringify(router)}`);
            const data = {info, router};
            commit("generateChaos", {hashSign, data});
        }
    }
});

export default Store;
