<template>
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        @click="setRating(star)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="{'text-yellow-400': star <= localRating, 'text-gray-300': star > localRating}"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true,
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        localRating: this.rating,
      };
    },
    watch: {
      rating(newRating) {
        this.localRating = newRating;
      }
    },
    methods: {
      setRating(star) {
        if (this.editable) {
          this.localRating = star;
          this.$emit('update:rating', star);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: flex; /* Use flexbox for horizontal alignment */
    align-items: center; /* Center items vertically */
  }
  
  .star {
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .star:hover,
  .star:hover ~ .star {
    color: #ffecb3; /* Lighter gold for hover effect */
  }
  </style>
  