import axios from "src/api/axios";
const removeDirectHotelFromHotel = async (
  hotelId,
  token,
  setSelectedId,
  selectedDirectHotelName,
  mutate
) => {
  try {
    let data = new FormData();
    data.append("_method", "delete");

    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/direct/destroy`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setSelectedId(null);
      selectedDirectHotelName(null);
      mutate();
    }
  } catch (err) {
    console.log(err);
  }
};

export default removeDirectHotelFromHotel;
