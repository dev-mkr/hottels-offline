import axios from "src/api/axios";

const deleteDmc = async (hotelId, dmcId, token, setIsDeleted, mutate) => {
  try {
    const form = new FormData();
    form.append("_method", "DELETE");
    form.append("dmc_id[]", dmcId);

    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/dmc/${dmcId}/destroy`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: form,
    });
    if (res.status === 200) {
      setIsDeleted(true);
      console.log("mutate is running");
      mutate();
    }
  } catch (err) {
    setIsDeleted(false);
    console.log(err);
  }
};

export default deleteDmc;
