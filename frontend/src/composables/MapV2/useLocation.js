import { ref } from 'vue';
import locationService from '@/services/locationService';

export function useLocation() {
    const locations = ref([]);
    const loading = ref(false);

    const fetchLocations = async () => {
        try {
            loading.value = true;
            const result = await locationService.getAll();
            locations.value = result.data;
            loading.value = false;
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const addLocation = async (locationData) => {
        try {
            const result = await locationService.create(locationData);
            if (result?.data) {
                locations.value.push(result.data);
            }
        } catch (error) {
            console.error("Error adding location:", error);
        }
    };

    const deleteLocation = async (id) => {
        try {
            await locationService.delete(id);
            locations.value = locations.value.filter(location => location.id !== id);
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };

    return {
        locations,
        fetchLocations,
        addLocation,
        deleteLocation,
        loading,
    };
}
