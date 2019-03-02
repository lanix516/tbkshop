<template>
  <div class="tax-box displayType0" style="background:#FFF1F1;  color:#FF615E; ">
    <div class="mui-flex tax-item">
      <div class="tax-item-left cell">
        <div class="mui-flex tax-item-part-top">
          <div class="tax-main cell">
            <div class="tb">
              <div class="tc">
                <div class="c-main">
                  <i class="mui-price-rmb">￥</i>
                  <span class="rmb">{{offset}}</span>
                </div>
                <div class="c-sub">
                  <div class="c-sub-item">{{couponInfo}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tax-split">
        <div class="line" style="border-color:#FFCDCD;opacity: 1;"></div>
      </div>
      <div class="tax-item-right cell">
        <div class="mui-flex">
          <div
            class="tax-operator cell"
            asac
            data-lottery
            data-uuid="4106f5d217754efb84141f1178eaf355"
            data-type="1"
            data-display-type="0"
            data-params
            style
          >
            <div class="tb">
              <div class="tc">
                <div class="c-jf">
                  <a
                    style="color:#FF615E;cursor:pointer!important"
                    :href="quanUrl"
                    target="_blank"
                  >立即领取</a>
                </div>
                <div class="c-dh" style></div>
                <div class="c-jh"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["offset", "quanUrl", "couponInfo"]
};
</script>
<style lang="less" scoped>
.tax-box {
  border-radius: 6px;
  overflow: hidden;
  .mui-flex {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    flex-wrap: wrap;
    > .cell {
      flex-basis: 0;
      width: 0;
      max-width: 100%;
      display: block;
      position: relative;
      padding: 0 !important;
    }
  }

  .tax-item-left {
    flex: 3;
    .tax-item-part-top {
      height: 92px;
      box-sizing: border-box;
      .tax-main {
        flex: 3;
        padding: 0 0 0 12px !important;
        overflow: hidden;
        min-width: 138px;
      }
      .c-main {
        line-height: 28px;
        .rmb {
          font-size: 30px;
          font-weight: 700;
        }
      }
      .c-sub {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .tax-split {
    position: relative;
    height: 90px;
    width: 1px;
    .line {
      border-right: 1px dotted #ffcdcd;
      opacity: 0.7;
      width: 100%;
      height: 100%;
    }
  }
  .tax-split::before {
    top: -5px;
    z-index: 1;
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    left: -4px;
  }
  .tax-split::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    left: -4px;
  }
  .tax-item-right {
    min-width: 100px;
    max-width: 170px;
    flex: 1;
  }
  .tax-operator {
    text-align: center;
    position: relative;
    overflow: hidden;
    min-width: 100px;
    max-width: 170px;
    background-size: 100% 100%;
  }
  .tb {
    display: table;
    width: 100%;
    height: 92px;
  }
  .tb .tc {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
