import React, { useState, useEffect } from "react";
import AddEmpresa from "../addEmpresa/AddEmpresa";
import {
  getCompanies,
  getUser,
  deleteCompany,
  getPhotoByCompanie,
} from "../actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { Companies } from "../types/companies";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "@/app/modal/Modal";

const CompaniesComponent = () => {
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Companies | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      const user = await getUser();
      const response = await getCompanies(user?.id ?? "");
      const companiesData = response?.data ?? [];
      setCompanies(companiesData);

      const imageUrls: { [key: number]: string } = {};
      await Promise.all(
        companiesData.map(async (company: Companies) => {
          const imageUrl = await getPhotoByCompanie(company);
          imageUrls[company.company_id] =
            imageUrl || "https://via.placeholder.com/150x150.png";
        })
      );
      setImageUrls(imageUrls);

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
      const updatedCompanies = companies.filter(
        (company) => company.company_id !== companyId
      );
      setCompanies(updatedCompanies);
      const updatedImageUrls = { ...imageUrls };
      delete updatedImageUrls[companyId];
      setImageUrls(updatedImageUrls);
    } else {
      console.error("Failed to delete company");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md h-full bg-background text-foreground">
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
                
                sx={{
                  backgroundColor: "transparent",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#439D5D",
                    color: "white"
                  },
                }}
              >
                <CiSquarePlus size={40} />
                <p>Adicionar Nova Empresa</p>
              </Button>
            </Grid>
            {companies.map((company) => (
              <Grid item xs={12} key={company.company_id}>
                <Card
                  sx={{
                    display: "flex",
                    background: "var(--btn-background)",
                    borderRadius: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={
                      imageUrls[company.company_id] ||
                      "https://via.placeholder.com/150x150.png"
                    }
                    alt="Company Image"
                  />
                  <CardContent sx={{ flex: "1" }}>
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-black"
                    >
                      {company.name}
                    </Typography>
                    <Typography variant="body2" className="text-black">
                      {company.description}
                    </Typography>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      
                      <Button
                        onClick={() => handleEditCompanyClick(company)}
                        variant="outlined"
                        className="text-white hover:bg-red-2000"
                      >
                        <MdEdit size={20} />
                      </Button>

                      <Modal company_id={company.company_id}/>
                    </div>
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
