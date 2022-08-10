<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      label-width="0px"
    >
      <div class="title-content">
        <h3 class="title">{{ $t("login.title") }}</h3>
        <div class="international">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="languageIcon" class="language-icon"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in languageList"
                :key="item.value"
                :command="item.value"
                :disabled="locale === item.value"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <el-form-item prop="name">
        <!--       -->
        <el-input :placeholder="getPlaceholder('userName')" v-model="form.name">
          <template slot="prepend">
            <i class="el-icon-user-solid"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :placeholder="getPlaceholder('password')"
          :type="typePd"
          autocomplete="off"
          v-model="form.password"
        >
          <template slot="prepend">
            <i class="el-icon-s-goods"></i>
          </template>
          <template slot="append">
            <img
              class="eye"
              v-if="typePd === 'text'"
              @click="typePd = 'password'"
              :src="eyeIcon"
              alt=""
            />
            <img
              class="eye"
              v-if="typePd === 'password'"
              :src="noEyeIcon"
              @click="typePd = 'text'"
              alt=""
            />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm()">
          {{ $t("login.submit") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { LanguageList } from "./modal/login-modal";

export default {
  name: "login",
  data() {
    return {
      // form表单
      form: {
        name: 'admin',
        password: 123456,
      },

      // form校验
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      languageIcon: require("@/assets/imgs/login/language.svg"),
      eyeIcon: require("@/assets/imgs/login/eye.svg"),
      noEyeIcon: require("@/assets/imgs/login/no-eye.svg"),
      locale: this.$i18n.locale,

      languageList: LanguageList,

      typePd: "password",
    };
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    /**
     * 语言切换
     * @param evt
     */
    handleCommand(evt) {
      sessionStorage.setItem("locale", evt);
      this.$i18n.locale = evt;
      this.locale = this.$i18n.locale;
    },

    /**
     * Placeholder
     */
    getPlaceholder(type) {
      return this.$t(`login.${type}`);
    },

    /**
     * 登录
     */
    submitForm() {
      if (this.form.name === 'admin' && +this.form.password === 123456) {
        this.$router.push({
          path: '/strategyArrangement'
        })
        localStorage.setItem('token', '123')
      } else {
        this.$message.error('用户名或者密码错误！');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .login-form {
    width: 520px;
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;
    .title-content {
      position: relative;
      .title {
        font-size: 26px;
        color: #eee;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: 700;
      }
      .international {
        position: absolute;
        top: 3px;
        right: 0;
        cursor: pointer;
        .language-icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    .eye {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
}
</style>
