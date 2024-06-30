import OrganizationService from "../services/organizations.js";

class OrganizationController {
  async createOrganization(req, res) {
    const data = req.body;
    const response = await OrganizationService.createOrganization(data);
    if (response.status !== "error")
      return res
        .status(201)
        .send({ message: "Organization creation Successful", response });
    else
      return res.status(500).send({
        error: "Error occured while creation of Organization",
        errorDetails: response.error,
      });
  }
  async updateOrganization(req, res) {
    const data = req.body;
    const { id } = req.params;
    const response = await OrganizationService.updateOrganization(data, id);
    return response
      ? res.status(200).send({ message: "Updated Organization Successfully", response })
      : res.status(500).send({ message: "Error occured while updating Organization" });
  }
  async fetchOrganizations(req, res) {
    const response = await OrganizationService.fetchOrganizations();
    if (response && response.length > 0) return res.status(200).send(response);
    else
      return res.status(500).send({ message: "Error occured while fetching Organizations" });
  }
  async fetchOrganizationById(req, res) {
    const { id } = req.params;
    const response = await OrganizationService.fetchOrganizationById(id);
    return (response
      ? res.status(200).send(response)
      : res.status(404).send({ Error: "No Organization Found" }))
  }
  async deleteOrganization(req, res) {
    const { id } = req.params;
    const result = await OrganizationService.deleteOrganization(id);
    return (result.deletedCount > 0
      ? res.status(200).send(result)
      : res.status(404).send({ message: "No Organization Found" }))
  }
}

export default new OrganizationController();