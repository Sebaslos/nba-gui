<template>
    <div class="container-fluid">
        <div class="row">
            <app-sidebar v-on:getData="get"></app-sidebar>
            <app-content></app-content>
        </div>
    </div>
</template>

<script>
    import AppSidebar from './AppSidebar'
    import AppContent from './AppContent'
    export default {
        components: {
            AppSidebar,
            AppContent
        },
        data: function () {
            return {
            }
        },
        methods: {
            get: function (msg) {
                alert(msg);
            }
        }
    }
</script>