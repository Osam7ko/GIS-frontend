<template>
    
    <div class="favorite-list">
        <h3>Locations saved</h3>
        <div v-if="!locations?.length" class="empty-message">
            No locations yet.
        </div>
        <ul >
            <li v-for="loc in locations" :key="loc.id">
            <div class="location-info" @click="$emit('select', loc)">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ loc.name }}</span>
            </div>
            <button @click="$emit('delete', loc.id)" class="delete-btn">🗑</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['locations'],
        emits: ['select', 'delete']
    }
</script>

<style scoped>
.favorite-list {
    position: absolute;
    top: 170px;
    left:10px;
    margin-bottom: 20px;
    background: white;
    border-radius: 10px;
    margin-top: 1rem;
    max-height: 300px;
    max-width: 300px;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 8px 14px;
    z-index: 999;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.favorite-list h3 {
    margin-bottom: 10px;
}
.favorite-list ul {
    list-style: none;
    padding: 0;
}
.favorite-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
}
.location-info {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}
.location-info:hover {
    color: #007bff;
}
.delete-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: red;
}
.empty-message {
    font-style: italic;
    color: gray;
}
</style>
