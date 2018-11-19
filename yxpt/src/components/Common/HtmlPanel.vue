<template>
    <p v-html="html"></p>
</template>
<script>
    export default {
        props:['htmlUrl'],
        data () {
            return {
                html: '' 
            }
        },
        mounted(){
             console.log(this.htmlUrl)
             console.log('swwwwwwwwwwwwwww')
            this.load(this.htmlUrl)
        },
        methods:{
            load(url){
               
                var self = this
                 $.ajax({ 
                    url:url, 
                    type: 'GET', 
                    // dataType: 'jsonp', 
                    // jsonp:"callback",
                    // jsonpCallback:"success_jsonpCallback",
                     accept: 'text/html, text/plain',
                    success: function (res) { 
                        console.log(res)
                         self.html = res.data
                    } 
                 }) 
            }
        }
    }
</script>