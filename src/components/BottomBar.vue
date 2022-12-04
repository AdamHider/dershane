<template>
    <v-bottom-navigation>
        <v-btn value="home" to="/home">
            <v-icon>mdi-history</v-icon>
            Home
        </v-btn>
        <v-btn value="classroom" to="/classroom">
            <v-icon>mdi-heart</v-icon>
            Classroom
        </v-btn>
        <v-btn value="notifications" to="/notifications">
            <v-icon>mdi-map-marker</v-icon>
            Notifications
        </v-btn>
        <v-btn value="user-dashboard" to="/user-dashboard">
            <v-icon>mdi-map-marker</v-icon>
            Student
        </v-btn>
    </v-bottom-navigation>
</template>
  