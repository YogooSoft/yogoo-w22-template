<template>

    <h1>Main</h1>
    <h5>查询条件1</h5>
    <el-input v-model="searchVal.value1" placeholder="Please input" type="text"/>
    <h5>查询条件2</h5>
    <el-input v-model="searchVal.value2" placeholder="Please input" type="text"/>
<!--    <b>Main查询条件:{{searchVal}}</b>-->
    <br><br>
    <b>子菜单DATA:</b>
    <textarea name="" id="" cols="30" rows="10"> {{psnTableData}} </textarea>
    <br>


    <!--    <h5>查询条件3</h5>-->
    <el-tabs ref="form" :model="form" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="选项卡1" name="first" style="height: 100%;">

            <!--
            name：与路由json中的name相匹配；使路由匹配到当前<router-view>
            :searchVal： 查询条件变量值，向子菜单传值   形式：:xxxxx='value'
            :teamInfoBK：回写数据变量值，用于实现，页面路由切换时，页面内数据不消失，向子菜单传值   形式：:xxxxx='value'
            @getTeamInfo:提供给子菜单调用的函数，用于子菜单向父菜单传值 形式：@XXXX='func'
            -->
            <router-view class="rv1" name="children_01" :searchVal="searchVal" @getTeamInfo="teamInfo"
                         :teamInfoBK="teamInfoBK" >
            </router-view>


        </el-tab-pane>
        <el-tab-pane label="选项卡2" name="second">
            <router-view class="rv2" name="children_02" :searchVal="searchVal" @getTeamInfoC2="teamInfoC2"
                         :teamInfoBK="teamInfoBK"></router-view>


        </el-tab-pane>
        <el-tab-pane label="选项卡3" name="third">
            <router-view class="rv3" name="children_03" :searchVal="searchVal" @getTeamInfoC3="teamInfoC3"
                         :teamInfoBK="teamInfoBK"></router-view>
        </el-tab-pane>


    </el-tabs>


</template>
<script lang="ts">
    import {defineComponent, computed, ref} from 'vue';


    export default defineComponent({
        data() {
            return {
                tag_list: new Array<any>(), // 权限列表
                activeName: 'first',
                // 查询条件数据
                searchVal: {
                    value1: "",
                    value2: "",
                },
                // 子菜单数据字典
                psnTableData: {},
                // 子菜单数据回写字典
                teamInfoBK: {},


            };
        },
        methods: {

            // 配置各选项卡跳转路由
            handleClick(tab, event) {
                if (tab.paneName === 'first') {
                    // 选项卡1
                    this.$router.push("/page/insideRouter/c1/index");

                }
                if (tab.paneName === 'second') {
                    // 选项卡2
                    this.$router.push("/page/insideRouter/c2/index");


                }
                if (tab.paneName === 'third') {
                    // 选项卡3
                    this.$router.push("/page/insideRouter/c3/index");

                }


            },
            // 获取子路由菜单数据c1
            teamInfo(value) {
                this.psnTableData['c1'] = value;
                this.teamInfoBK['c1'] = value;
            },
            // 获取子路由菜单数据c2
            teamInfoC2(value) {
                this.psnTableData['c2'] = value;
                this.teamInfoBK['c2'] = value;
            },
            // 获取子路由菜单数据c3
            teamInfoC3(value) {
                this.psnTableData['c3'] = value;
                this.teamInfoBK['c3'] = value;
            },

        },
        mounted() {
            // 页面刷新时，根据当前的路由判断重新加载后停留在哪个tab
            // 获取当前浏览器地址
            var str_url_now = window.location.href.toString();
            // 获取当前url路径
            const str_path_now = str_url_now.split('#', 2);
            // 跳转当前路径
            if (str_path_now[1] === "/page/insideRouter/c1/index") {
                this.activeName = 'first';

            }
            if (str_path_now[1] === "/page/insideRouter/c2/index") {
                // first second third
                this.activeName = 'second';

            }
            if (str_path_now[1] === "/page/insideRouter/c3/index") {
                // first second third
                this.activeName = 'third';

            }
            // 无匹配 进入第一个tab页
            else {
                this.activeName = 'first';
                this.$router.push("/page/insideRouter/c1/index");
            }


        },


    });
</script>
