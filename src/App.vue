<template>
  <div id="app">
    <h2>Texas Hold'em</h2>
    <div class="left_column">
      <ul>
        <li>
          <div class="name_column">{{ common.name }}</div>
          <PokeSlot v-for="card in common.cards" :class="card.type" :card="card"  />
        </li>
        <li v-for="player in players">
          <div class="name_column">{{ player.name }}</div>
          <PokeSlot v-for="card in player.cards" :class="card.type" :card="card"  />
        </li>
      </ul>
    </div>
    <div class="right_column">
      <div><strong>Rank</strong></div>
      <li v-for="candidate in candidates">
        <div class="name_column">{{ candidate.rank}} - {{candidate.name }}</div>
        <PokeSlot v-for="card in candidate.cards" :class="card.type" :card="card"  />
      </li>
    </div>
    <div class="button_area">
      <Press @click.native="recover" text="Recover" :class="{ inactive: counter <= 0 }"></Press>
      <Press @click.native="openCard" text="Send Card" :class="{ inactive: counter >= 5 }"></Press>
      <Press @click.native="close" text="Compare" :class="{ inactive: counter < 3 }"></Press>
      <Press @click.native="reset" text="Reset"></Press>
    </div>
  </div>
</template>

<script>
import PokeSlot from './components/Slot';
import Press from './components/Press';
import { Poker, getBestSet } from './poker';
import compare from './sets_compare';
import setsConvert from './sets_convert';

const USERS = ['Alice', 'Bob', 'Carol', 'Ted'];

export default {
  data() {
    const sets = Poker();
    const common = { name: 'common', cards: [] };
    const candidates = [];
    const counter = 0;
    const recoverBuffer = [];
    const players = USERS.map((name) => {
      const res = { name, cards: [] };
      for (let i = 0; i < 2; i += 1) {
        const rawObj = sets.next().value;
        // setTimeout(() => {
        res.cards.push(setsConvert.toCard(rawObj));
        // }, 1000 * i);
      }
      return res;
    });
    return { sets, players, common, candidates, counter, recoverBuffer };
  },
  methods: {
    recover() {
      if (this.common.cards.length <= 0) return;
      this.recoverBuffer.push(this.common.cards.pop());
      this.counter -= 1;
    },
    reset() {
      this.sets = Poker();
      this.common = { name: 'common', cards: [] };
      this.candidates = [];
      this.counter = 0;
      this.players = USERS.map((name) => {
        const res = { name, cards: [] };
        for (let i = 0; i < 2; i += 1) {
          const rawObj = this.sets.next().value;
          res.cards.push(setsConvert.toCard(rawObj));
        }
        return res;
      });
    },
    openCard() {
      if (this.counter >= 5) {
        return;
      }

      if (this.recoverBuffer.length > 0) {
        this.common.cards.push(this.recoverBuffer.pop());
      } else {
        const rawObj = this.sets.next().value;
        this.common.cards.push(setsConvert.toCard(rawObj));
      }
      this.counter += 1;
    },
    close() {
      if (this.counter < 3) {
        return;
      }
      this.candidates = [];
      // tmp = [name, {type, number, symbol}, ... ]
      const tmpArr = this.players.map((player) => {
        const numArr = setsConvert.toNumArr(player.cards.concat(this.common.cards));
        const playerBestnumArr = getBestSet(numArr);

        return { name: player.name, numArr: playerBestnumArr };
      });

      while (tmpArr.length > 0) {
        let best = tmpArr[0].numArr;
        let idx = 0;

        for (let i = 1; i < tmpArr.length; i += 1) {
          if (compare(tmpArr[i].numArr, best) === 1) {
            best = tmpArr[i].numArr;
            idx = i;
          }
        }

        const currentBest = tmpArr.splice(idx, 1).pop();
        const cards = currentBest.numArr.map(num => setsConvert.toCard(setsConvert.getCard(num)));
        this.candidates.push({ rank: -tmpArr.length + 4, name: currentBest.name, cards });
      }
    },
  },
  components: {
    PokeSlot, Press,
  },
};
</script>

<style>
ul {
  padding: 0px;
}
li {
  list-style: none;
  text-align: left;
  margin: 15px;
  height: 75px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.left_column {
  display:inline-block;
  min-width: 40%;
  height: 470px;
  border-style:solid;
  border-color: #CDBCBC;
  border-width:1px;
  padding: 10px;
}
.right_column {
  border-style:solid;
  height: 470px;
  border-width:1px;
  border-color: #CDBCBC;
  padding: 10px;
  vertical-align:top;
  display:inline-block;
  min-width: 40%;
}
.heart, .diamond {
  color: #EC0C0C;
}
.button_area {
  margin-top: 30px;
}
.club, .spade {
  color: black;
}
.name_column {
  margin-right: 10px;
  display:inline-block;
  height: 75px;
  text-align: right;
  line-height: 75px;
  width: 15%;
}

.right_column .name_column {
  margin-right: 10px;
  display:inline-block;
  height: 75px;
  text-align: left;
  line-height: 75px;
  width: 15%;
}
</style>
