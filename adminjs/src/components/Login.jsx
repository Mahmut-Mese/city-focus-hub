import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormGroup,
  H2,
  Input,
  Label,
  MessageBox,
  Text,
} from '@adminjs/design-system';

export default function Login() {
  const props = window.__APP_STATE__ ?? {};
  const branding = useSelector((state) => state.branding);
  const message = props.errorMessage;

  return (
    <Box
      variant="grey"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="xl"
      style={{
        background:
          'linear-gradient(135deg, #f4efe8 0%, #e8dccf 45%, #d9c4ab 100%)',
      }}
    >
      <Box
        bg="white"
        width={['100%', '100%', '960px']}
        minHeight="560px"
        display="flex"
        boxShadow="card"
        borderRadius="xl"
        overflow="hidden"
      >
        <Box
          width={['0', '0', '44%']}
          display={['none', 'none', 'flex']}
          flexDirection="column"
          justifyContent="space-between"
          p="xxl"
          style={{
            background: 'linear-gradient(180deg, #0f0f0f 0%, #1f1f1f 100%)',
            color: '#f5f1ea',
          }}
        >
          <Box>
            <img
              src="/admin-assets/logo.svg"
              alt={branding.companyName}
              style={{ width: 72, height: 72, objectFit: 'contain', marginBottom: 24 }}
            />
            <H2 color="white" marginBottom="lg">Client Content Portal</H2>
            <Text color="grey40">
              Use the same client-facing content surface you see in Strapi, backed by the copied comparison database.
            </Text>
          </Box>
          <Text color="grey50">The Leadenhall Works</Text>
        </Box>

        <Box
          as="form"
          action={props.action}
          method="POST"
          flexGrow={1}
          p="xxl"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box mb="xxl">
            <img
              src="/admin-assets/logo.svg"
              alt={branding.companyName}
              style={{ width: 64, height: 64, objectFit: 'contain', marginBottom: 20 }}
            />
            <H2 margin="0">Sign in</H2>
            <Text color="grey60">Client editor access for The Leadenhall Works.</Text>
          </Box>

          {message ? <MessageBox variant="danger" mb="lg">{message}</MessageBox> : null}

          <FormGroup>
            <Label required>Email</Label>
            <Input name="email" placeholder="client@leadenhallworks.com" />
          </FormGroup>

          <FormGroup>
            <Label required>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </FormGroup>

          <Box mt="xl">
            <Button variant="primary" size="lg">Log in</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
