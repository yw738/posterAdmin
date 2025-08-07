<template>
  <CenterMap />
  <div id="dp_body">
    <!-- <header class="brred">
      <div class="head_tit">欢迎某某某到公司考察</div>
    </header> -->
    <section class="brred">
      <div class="imgBox">
        <!--  -->
        <div class="tit_box">
          <img class="tit_bg_img" :src="titleBgImg" alt="" />
          <img class="SCSPCBA1_img" :src="SCSPCBA1" alt="" v-if="isShow1" />
          <img class="SCSPCBA1_img" :src="SCSPCBA2" alt="" v-else />
          <!-- <div class="txt">Welcom to SCSPCBA</div> -->
        </div>
        <div class="title2_box">
          <!-- <img class="bg_img brred" :src="bgImg" alt="" /> -->
          <div class="gsmc_txt ThreeDee">旭森智造工业互联（深圳）有限公司</div>
          <div class="gsmc_txt2 ThreeDee">Success Circuits Group Limited</div>
        </div>
        <div class="content" v-if="false">
          <div class="left">
            <!-- <img
              class="item_bg"
              :src="PcbImg"
              alt=""
              style="margin-top: 500px; opacity: 0.8"
            /> -->
          </div>
          <div class="center">
            <img class="item_bg" :src="PcbImg" alt="" style="margin-top: 500px; opacity: 0.8" />
          </div>
          <div class="right">
            <img
              v-if="false"
              class="item_bg"
              src="@/assets/img/tianqi.png"
              alt=""
              style="margin-top: 500px"
            />
            <!-- <img
              class="item_bg"
              :src="PcbImg"
              alt=""
              style="margin-top: 500px; opacity: 0.8"
            /> -->
          </div>
        </div>

        <div class="zz_box" v-if="true">
          <div class="item_box" v-for="(item, index) in list1" :key="index">
            <img class="item_bg" :src="PcbBgImg" alt="" />
            <div class="item_txt">
              <img :src="item.img" alt="" />
              <span>{{ item.txt }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import CenterMap from './centerMap.vue'

import titleBgImg from '@/assets/img/title14.png'
import PcbBgImg from '@/assets/img/17.gif'
import SCSPCBA1 from '@/assets/img/logo1.png'
import SCSPCBA2 from '@/assets/img/logo2.png'

import PcbImg from '@/assets/img/img1.png'
import PcbaImg from '@/assets/img/pcbaimg.png'
import BomImg from '@/assets/img/bomimg.png'

let list1 = ref([
  {
    img: PcbImg,
    txt: 'PCB制造'
  },
  {
    img: PcbaImg,
    txt: 'PCBA制造'
  },
  {
    img: BomImg,
    txt: '元器件'
  }
])

let isShow1 = ref(true)
onBeforeMount(() => {
  setInterval(() => {
    isShow1.value = !isShow1.value
  }, 2000)
})
</script>

<style lang="scss" scoped>
#dp_body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.bgColorBlack {
  background-color: rgba(19, 25, 47, 0.6);
  border-radius: 8px;
}
header {
  height: 100px;
  background-image: url('@/assets/img/head_bg.png');
  .head_tit {
    font-size: 46px;
    color: #fff;
    padding: 10px;
    letter-spacing: 0.1em;
    padding-left: 20px;
    text-align: center;
  }
}

section {
  height: calc(100% - 100px);
}
.imgBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.tit_box {
  position: absolute;
  // top: -36px;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  .tit_bg_img {
    width: 100%;
    height: 100%;
  }
  .SCSPCBA1_img {
    position: absolute;
    // top: 66px;
    // left: 37px;
    top: 37px;
    left: calc(50% - 136px);
    width: 240px;
  }
  .txt {
    position: absolute;
    top: 37px;
    left: calc(50% - 270px);
    width: 500px;
    text-align: center;
    font-size: 40px;
    color: #fff;
    letter-spacing: 0.1em;
  }
}
.title2_box {
  position: absolute;
  top: 310px;
  left: calc(50% - 450px);
  width: 900px;
  height: 107px;
  .bg_img {
    // border: 1px solid red;
    width: 100%;
    height: 100%;
  }
  .gsmc_txt {
    // background: #001925eb;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    text-align: center;
    letter-spacing: 0.6rem;
    line-height: 1em;
    color: rgb(209, 209, 209);
    font-weight: bold;
    font-size: 100px;
    white-space: nowrap;
  }
  .gsmc_txt2 {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    position: absolute;
    top: 130px;
    left: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    text-align: center;
    letter-spacing: 0.2rem;
    line-height: 1em;
    color: rgb(209, 209, 209);
    font-weight: bold;
    font-size: 103px;
    white-space: nowrap;
  }
  .ThreeDee {
    font-family: 'Microsoft YaHei';

    text-shadow:
      0px 0px 0 rgb(209, 209, 209),
      1px 1px 0 rgb(188, 188, 188),
      2px 2px 0 rgb(166, 166, 166),
      3px 3px 0 rgb(144, 144, 144),
      4px 4px 0 rgb(122, 122, 122),
      5px 5px 4px rgba(0, 0, 0, 0.5),
      5px 5px 1px rgba(0, 0, 0, 0.5),
      0px 0px 4px rgba(0, 0, 0, 0.2);
  }
}

.zz_box {
  position: absolute;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 650px;
  left: calc(50% - 790px);
  .item_box {
    width: 500px;
    // border: 1px solid red;
    height: 100%;
    position: relative;
    margin: 0 10px;
    .item_bg {
      // border: 1px solid yellow;
      height: 100%;
    }
    .item_txt {
      position: absolute;
      top: 212px;
      left: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        margin-right: 40px;
      }
      span {
        color: #fff;
        font-weight: 500;
        font-size: 56px;
      }
    }
  }
}

.content {
  // border: 1px solid red;
  height: 100%;

  padding: 200px 30px 70px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  .right,
  .center,
  .left {
    // border: 1px solid red;
    img {
      width: 100%;
    }
  }
  .center {
    // width: 50%;
    width: 22%;
  }
  .right,
  .left {
    width: 22%;
  }
  .left {
    img {
      width: 100%;
    }
  }
  .right {
    img {
      width: 100%;
    }
  }
}
</style>
