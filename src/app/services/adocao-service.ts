import { authApi } from './auth-service';
import { AxiosError } from 'axios';
import { 
  Adocao, 
  AdocaoSearchParams, 
  CreateAdocaoData 
} from '../types/api-types';

interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/**
 * Serviço para operações CRUD de Adoções
 */
export const adocaoService = {
  /**
   * Buscar todas as adoções com filtros opcionais
   */
  async getAdocoes(params?: AdocaoSearchParams): Promise<Adocao[]> {
    try {
      const response = await authApi.get('/adocoes', { params });
      console.log(`✅ Retrieved ${response.data.length} adoções`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get adoções:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar adoções.');
    }
  },

  /**
   * Buscar adoção por ID
   */
  async getAdocaoById(id: string): Promise<Adocao> {
    try {
      const response = await authApi.get(`/adocoes/${id}`);
      console.log(`✅ Retrieved adoção: ${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar adoção.');
    }
  },

  /**
   * Criar nova solicitação de adoção
   */
  async createAdocao(adocaoData: CreateAdocaoData): Promise<Adocao> {
    try {
      const response = await authApi.post('/adocoes', adocaoData);
      console.log(`✅ Created adoção for animal: ${adocaoData.animalId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to create adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao criar solicitação de adoção.');
    }
  },

  /**
   * Atualizar status da adoção
   */
  async updateAdocaoStatus(id: string, status: 'pendente' | 'aprovada' | 'rejeitada' | 'concluida'): Promise<Adocao> {
    try {
      const response = await authApi.patch(`/adocoes/${id}/status`, { status });
      console.log(`✅ Updated adoção status to: ${status}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to update adoção status:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao atualizar status da adoção.');
    }
  },

  /**
   * Cancelar adoção
   */
  async cancelAdocao(id: string, motivo?: string): Promise<void> {
    try {
      await authApi.delete(`/adocoes/${id}`, { 
        data: motivo ? { motivo } : undefined 
      });
      console.log(`✅ Cancelled adoção: ${id}`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to cancel adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao cancelar adoção.');
    }
  },

  /**
   * Buscar adoções do usuário atual
   */
  async getMinhasAdocoes(): Promise<Adocao[]> {
    try {
      const response = await authApi.get('/adocoes/minhas');
      console.log(`✅ Retrieved ${response.data.length} user adoções`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get user adoções:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar suas adoções.');
    }
  },

  /**
   * Buscar adoções por status
   */
  async getAdocoesByStatus(status: 'pendente' | 'aprovada' | 'rejeitada' | 'concluida'): Promise<Adocao[]> {
    try {
      const response = await authApi.get('/adocoes', { 
        params: { status } 
      });
      console.log(`✅ Retrieved ${response.data.length} adoções with status: ${status}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get adoções by status:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar adoções por status.');
    }
  },

  /**
   * Buscar adoções por animal
   */
  async getAdocoesByAnimal(animalId: string): Promise<Adocao[]> {
    try {
      const response = await authApi.get('/adocoes', { 
        params: { animalId } 
      });
      console.log(`✅ Retrieved ${response.data.length} adoções for animal: ${animalId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get adoções by animal:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar adoções do animal.');
    }
  },

  /**
   * Aprovar adoção (apenas para administradores/abrigos)
   */
  async aprovarAdocao(id: string, observacoes?: string): Promise<Adocao> {
    try {
      const response = await authApi.patch(`/adocoes/${id}/aprovar`, { 
        observacoes 
      });
      console.log(`✅ Approved adoção: ${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to approve adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao aprovar adoção.');
    }
  },

  /**
   * Rejeitar adoção (apenas para administradores/abrigos)
   */
  async rejeitarAdocao(id: string, motivo: string): Promise<Adocao> {
    try {
      const response = await authApi.patch(`/adocoes/${id}/rejeitar`, { 
        motivo 
      });
      console.log(`✅ Rejected adoção: ${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to reject adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao rejeitar adoção.');
    }
  },

  /**
   * Finalizar adoção (concluir processo)
   */
  async finalizarAdocao(id: string, documentos?: string[]): Promise<Adocao> {
    try {
      const response = await authApi.patch(`/adocoes/${id}/finalizar`, { 
        documentos 
      });
      console.log(`✅ Finalized adoção: ${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to finalize adoção:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao finalizar adoção.');
    }
  },

  /**
   * Buscar estatísticas de adoção
   */
  async getEstatisticas(): Promise<{
    total: number;
    pendentes: number;
    aprovadas: number;
    rejeitadas: number;
    concluidas: number;
    porMes: Record<string, number>;
  }> {
    try {
      const response = await authApi.get('/adocoes/estatisticas');
      console.log('✅ Retrieved adoption statistics');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get adoption statistics:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao buscar estatísticas de adoção.');
    }
  }
};

export default adocaoService;
