import React, { useState, useEffect } from "react";
import AddEmpresa from "../addEmpresa/AddEmpresa";
import { getCompanies, getUser, deleteCompany } from "../actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Companies } from "../types/companies";

const CompaniesComponent = () => {
  const [companies, setCompanies] = useState<Companies[] | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Companies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      const user = await getUser();
      const response = await getCompanies(user?.id ?? "");
      setCompanies(response?.data);
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const handleAddCompanyClick = () => {
    setEditingCompany(null);
    setShowAddForm(true);
  };

  const handleEditCompanyClick = (company: Companies) => {
    setEditingCompany(company);
    setShowAddForm(true);
  };

  const handleDeleteCompany = async (companyId: number) => {
    const user = await getUser();
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }

    const deleted = await deleteCompany(companyId);
    if (deleted) {
      console.log("Company deleted successfully");
      const updatedCompanies = companies?.filter((company) => company.company_id !== companyId);
      setCompanies(updatedCompanies);
    } else {
      console.error("Failed to delete company");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md h-full">
      {loading ? (
        <p>Carregando empresas...</p>
      ) : showAddForm ? (
        <AddEmpresa existingCompany={editingCompany} />
      ) : (
        <div>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h4" component="h1">
                Minhas Empresas
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                onClick={handleAddCompanyClick}
                variant="contained"
                color="primary"
              >
                Adicionar Nova Empresa
              </Button>
            </Grid>
            {companies?.map((company) => (
              <Grid item key={company.company_id}>
                <Card>
                  <CardContent>
                    <img
                      src={`https://via.placeholder.com/150x150.png`} // URL de imagem de placeholder
                      alt="Placeholder"
                    />
                    <Typography variant="h6" component="div">
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {company.description}
                    </Typography>
                    <Button
                      onClick={() => handleEditCompanyClick(company)}
                      variant="contained"
                      color="primary"
                    >
                      Editar Empresa
                    </Button>
                    <Button
                      onClick={() => handleDeleteCompany(company.company_id)}
                      variant="contained"
                      color="secondary"
                    >
                      Excluir Empresa
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default CompaniesComponent;
