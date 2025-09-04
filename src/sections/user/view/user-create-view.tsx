import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ROLES = [
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
];

const STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'banned', label: 'Banned' },
];

// ----------------------------------------------------------------------

export function UserCreateView() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        status: 'active',
        isVerified: false,
        avatarUrl: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company is required';
        }

        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            // Here you would typically make an API call to create the user
            console.log('Creating user:', formData);

            // For demo purposes, just navigate back to users list
            router.push('/user');
        }
    };

    const handleCancel = () => {
        router.push('/user');
    };

    return (
        <DashboardContent>
            <Box
                sx={{
                    mb: 5,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Create New User
                </Typography>
            </Box>

            <Card sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Avatar Section */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Avatar
                                    src={formData.avatarUrl}
                                    alt={formData.name}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                />
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    component="label"
                                    startIcon={<Iconify icon="mingcute:add-line" />}
                                >
                                    Upload Avatar
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    handleInputChange('avatarUrl', event.target?.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </Button>
                            </Box>
                        </Grid>

                        {/* Form Fields */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Company"
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        error={!!errors.company}
                                        helperText={errors.company}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth error={!!errors.role} required>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={formData.role}
                                            label="Role"
                                            onChange={(e: SelectChangeEvent) => handleInputChange('role', e.target.value)}
                                        >
                                            {ROLES.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={formData.status}
                                            label="Status"
                                            onChange={(e: SelectChangeEvent) => handleInputChange('status', e.target.value)}
                                        >
                                            {STATUS_OPTIONS.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.isVerified}
                                                onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                                            />
                                        }
                                        label="Verified User"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
                        <Button color="inherit" variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button color="inherit" type="submit" variant="contained">
                            Create User
                        </Button>
                    </Stack>
                </Box>
            </Card>
        </DashboardContent>
    );
}