package com.kuai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuai.controller.AuthRestAPIs;
import com.kuai.controller.TestRestAPIs;
import com.kuai.repository.RoleRepository;
import com.kuai.repository.UserRepository;
import com.kuai.security.jwt.JwtAuthEntryPoint;
import com.kuai.security.jwt.JwtProvider;
import com.kuai.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {TestRestAPIs.class, AuthRestAPIs.class})
class KuaiApplicationTests {
	private MockMvc mockMvc;

	private ObjectMapper mapper = new ObjectMapper();

	@Autowired
	private WebApplicationContext webApplicationContext;

	@MockBean
	private UserDetailsServiceImpl userDetailsService;

	@MockBean
	private JwtAuthEntryPoint jwtAuthEntryPoint;

	@MockBean
	private UserRepository userRepository;

	@MockBean
	private RoleRepository roleRepository;

	@MockBean
	private JwtProvider jwtProvider;

	@BeforeEach
	public void setMockMvc() {
		this.mockMvc = MockMvcBuilders
				.webAppContextSetup(webApplicationContext)
				.apply(springSecurity())
				.build();
	}

	@Test
	@WithMockUser(roles = "USER")
	public void testUser() throws Exception {
		this.mockMvc.perform(get("/api/test/user"))
				.andExpect(status().isOk())
				.andExpect(content().string(">>> User Contents!"));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	public void testAdmin() throws Exception {
		this.mockMvc.perform(get("/api/test/admin"))
				.andExpect(status().isOk())
				.andExpect(content().string(">>> Admin Contents"));
	}
}