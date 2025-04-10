<template>
    <!-- Container -->
    <div class="feature-container">
        <!-- Features -->
        <div class="feature-text">
            <h3>{{ title }}</h3>
            <p v-html="description"></p>
            <div class="imges" v-if="title === 'Map V1'">
                <div>
                    <img src="/leaflet.png" alt="leaflet logo" class="leaflet"/>
                    <img src="/Nominatim.png" alt="Nominatim logo" />
                </div>
            </div>
            <div class="imges" v-if="title === 'Map V2'">
                <div>
                    <img src="/leaflet.png" alt="leaflet logo" class="leaflet"/>
                    <img src="/Nominatim.png" alt="Nominatim logo" />
                    <img src="/Mapbox.png" alt="Nominatim logo" />
                </div>
            </div>
        </div>

        <!-- Card img -->
        <div class="feature-carousel">
            <div class="card" v-for="(img, index) in imagesToShow" :key="index">
                <img :src="img" alt="feature image" @click="expandImage(img)" />
            </div>
        </div>

        <!-- Model img -->
        <div class="img-modal" v-if="expandedImg" @click="closeModal">
            <img :src="expandedImg" class="modal-content" />
            <span class="close-btn" @click.stop="closeModal">×</span>
        </div>
        <router-link :to="route" class="goto-link">Go to page →</router-link>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        images: Array,
        route: String
    },
    data() {
        return {
        imagesToShow: [],
        index: 0,
        expandedImg: null,
        };
    },
    mounted() {
        if (this.images.length > 0) {
        this.updateImages();
        setInterval(this.updateImages, 3000);
        }
    },
    methods: {
        updateImages() {
        this.imagesToShow = [
            this.images[this.index % this.images.length],
            this.images[(this.index + 1) % this.images.length],
            this.images[(this.index + 2) % this.images.length],
        ];
        this.index++;
        },
        expandImage(img) {
        this.expandedImg = img;
        },
        closeModal() {
        this.expandedImg = null;
        },
    },
};
</script>

<style scoped>
.feature-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(26, 26, 46, 0.7);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
}

.feature-container:hover {
    transform: translateY(-5px);
    background: rgba(26, 26, 46, 0.9);
}

.feature-text h3 {
    font-size: 1.5rem;
    color: #f8f9fa;
    margin-bottom: 1rem;
}

.feature-text p {
    color: #ced4da;
    line-height: 1.8;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
}

.feature-carousel {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.card {
    width: 180px;
    height: 180px;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}
.imges {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.imges img {
    height: 40px;
    width: auto;
    object-fit: contain;
    filter: grayscale(100%) brightness(1.5);
    transition: filter 0.3s ease;
}

.imges img:hover {
    filter: grayscale(0%) brightness(1);
}

.references {
    margin-top: 1rem;
}

.reference-text {
    color: #adb5bd;
    font-size: 0.9rem;
}

.reference-link {
    color: #4cc9f0;
    text-decoration: none;
    transition: color 0.3s ease;
}

.reference-link:hover {
    color: #3aa8d8;
    text-decoration: underline;
}

/* Modal Styles */
.img-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.modal-content {
    max-width: 80vw;
    max-height: 80vh;
    width: 1200px;
    height:1200px ;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 0 20px #fff;
}

.close-btn {
    position: absolute;
    top: 30px;
    right: 40px;
    font-size: 40px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}
.goto-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(76, 201, 240, 0.1);
    color: #4cc9f0;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.goto-link:hover {
    background: rgba(76, 201, 240, 0.2);
    transform: translateX(5px);
}
</style>
